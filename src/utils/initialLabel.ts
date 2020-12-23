import INITIAL_LABEL_OPTIONS from "../constants/INITIAL_LABEL_OPTIONS"

export default function getInitialLabel(): string{
    return INITIAL_LABEL_OPTIONS[Math.floor(Math.random() * INITIAL_LABEL_OPTIONS.length)]
}