import { useSpeechSynthesis } from 'react-speech-kit';
import { audioSpeak } from '../../utils/audio';

type QuizType1Props = {
    data: any,
    check: boolean,
    select: any,
    onHanldeSetSelect: (select: any, check: boolean) => void
}

const QuizType4 = ({ data, check, select, onHanldeSetSelect }: QuizType1Props) => {
    const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
    return (
        <div className={`relative flex items-start py-4 
        ${data._id == select?.id
                ? " border-[#5DADE2] bg-[#D6EAF8] text-[#2E86C1]"
                : "border-[#CCCCCC]"} 
                ${check === true
                ? data._id == select?.id
                    ? select?.isCorrect === 1
                        ? "bg-[#D6EAF8] border-[#5DADE2] "
                        : "bg-[#F9EBEA] !border-[#C0392B] !text-[#C0392B]"
                    : ""
                : ""}
        `}
            onClick={() => {
                if (check !== true) {
                    onHanldeSetSelect({ id: data._id, isCorrect: data.isCorrect }, check)
                }
            }}
        >
            <div className="flex items-center h-5 ml-3"

            >
                <input type="radio" checked={select?.id === data._id}
                    className={`${check === true
                        ? data._id == select?.id
                            ? data?.isCorrect === 1
                                ? "accent-[#5DADE2] "
                                : "accent-[#C0392B]"
                            : ""
                        : ""}`}
                />

            </div>
            <div className="flex items-center h-5 ml-3"
                onClick={() =>  audioSpeak(data.answer,false)}
            >
                <i className="mr-3 fa-solid fa-volume-high"></i>

            </div>
            <div className="flex-1 min-w-0 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                    {data.answer}
                </label>
            </div>

        </div>
    )
}

export default QuizType4