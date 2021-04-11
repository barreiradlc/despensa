import { LOADING_LABEL_OPTIONS } from "../constants/LABELS"

export default function getInitialLabel(): string{
    return LOADING_LABEL_OPTIONS[Math.floor(Math.random() * LOADING_LABEL_OPTIONS.length)]
}