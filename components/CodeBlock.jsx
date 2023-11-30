import React,{useState} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {IoIosCheckmarkCircleOutline, IoIosCopy} from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify'

const languagePrefix = '>language-'

const CodeBlock = ({text}) => {
    const [copied, setCopied] = useState(false)
    const notify = () => {
        // toast(<ToastDisplay className='bg-neutral-700 m-2' />)
        copy()
    }

    function ToastDisplay () {
        return (
            <div className='m-2'>
                <p className='text-md'>Copied to clipboard !</p>
            </div>
        )
    }

    const copy = () => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 5000)
    }

    let fistLine = text?.split("\n")[0]
    let language = "javascript"
    if (fistLine.includes(languagePrefix)){
        text = text.substring(text.indexOf("\n") + 1)
        language = fistLine.replace(languagePrefix,"").trim()
    }
    return (
        <div className="relative">
            <button
                className="absolute flex flex-row  top-0 right-0 p-2">
                <CopyToClipboard text={text}
                    onCopy={(copied) => notify()}>
                    {copied
                        ? <IoIosCheckmarkCircleOutline size={24} className="text-lg m-1 text-green-500" />
                        : <IoIosCopy size={20} className="text-lg m-1 text-white hover:text-gray-500" />}
                </CopyToClipboard>
            </button>
            <SyntaxHighlighter language={language} style={atomDark}>
                {text}
            </SyntaxHighlighter>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                closeButton={false}
                limit={1}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light" />
        </div>
    )
}

export default CodeBlock;