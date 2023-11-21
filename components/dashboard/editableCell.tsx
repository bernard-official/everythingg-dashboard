import { ChangeEvent, useState } from "react";
import { Input } from "..";

const EditableCell: React.FC = () => {
    const [value, setValue] = useState('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return(
        <Input
        value={value}
        onChange={handleChange}
        />
    )
}
export default EditableCell