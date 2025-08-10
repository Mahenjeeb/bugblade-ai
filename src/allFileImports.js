import { useEffect, useRef, useState } from "react";
import { useEditor } from "./context/EditorContext";
import Editor from "@monaco-editor/react";
import { sendDataToAI } from "./hooks/useDataFromAI";

export {useEffect, useRef, useState, useEditor, Editor, sendDataToAI}