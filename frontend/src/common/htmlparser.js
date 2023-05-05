import { Parser } from "html-to-react";

const htmlParse = new Parser()

export const htmlParser = (string) =>{
    return htmlParse.parse(string)
}