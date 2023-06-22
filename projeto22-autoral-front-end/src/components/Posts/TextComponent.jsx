import { MainTextBox } from './layout';

export default function TextComponent({ p }) {
    return (
        <MainTextBox>
            {`${p.text}`}
        </MainTextBox>
    )
}