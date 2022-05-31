import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface Props {
    options: {}[];
    onChange: (e: any) => void;
    selectedValue?: string;
}
const OrderByButtonGroup = ({ options, onChange, selectedValue }: Props) => {
    return (
        <FormControl>
            <FormLabel>Sort by Price</FormLabel>
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({ value, label }: any) => (
                    <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default OrderByButtonGroup