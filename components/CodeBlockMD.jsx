import React,{useState} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {IoIosCheckmarkCircleOutline, IoIosCopy} from "react-icons/io";


const CodeBlockMD = ({props}) => {
    const {children, className, node, ...rest} = props
    const match = /language-(\w+)/.exec(className || '')
    const [copied, setCopied] = useState(false)
    const notify = () => {
        copy()
    }
    const copy = () => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 5000)
    }
    const text = String(children).replace(/\n$/, '')

    return match ?
        (<div className="relative">
            <button
                className="absolute flex flex-row  top-0 right-0 p-2">
                <CopyToClipboard text={text}
                    onCopy={(copied) => notify()}>
                    {copied
                        ? <IoIosCheckmarkCircleOutline size={24} className="text-lg m-1 text-green-500" />
                        : <IoIosCopy size={20} className="text-lg m-1 text-white hover:text-gray-500" />}
                </CopyToClipboard>
            </button>
            <SyntaxHighlighter PreTag="div"
                               children={text}
                               language={match[1]}
                               style={atomDark}/>
        </div>)
        :
        (<code {...rest} className={className}>
            {children}
        </code>);
}

export default CodeBlockMD;