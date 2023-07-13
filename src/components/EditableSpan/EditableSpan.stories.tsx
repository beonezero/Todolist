import {action} from "@storybook/addon-actions"
import React from "react";
import {EditableSpan} from "./EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const changeTitleCallback = action("Title changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"hello"} onChange={changeTitleCallback}/>
}