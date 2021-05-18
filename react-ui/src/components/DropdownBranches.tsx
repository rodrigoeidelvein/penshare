import {ChangeEvent, useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Branch} from "../utils/interfaces";

const DropdownBranches: React.FC<{ padId: string, mainBranchId: number }> = ({ padId, mainBranchId }) => {
    const [branch, setBranch] = useState<string>('');
    const [branches, setBranches] = useState<Branch[]>([]);

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        setBranch(event.target.value as string);
    }

    const renderBranches = () => {
        if (!branches.length) {
            return ''
        }

        return branches.map(branch => (
            <MenuItem value={branch.name} key={branch.id}>{branch.name}</MenuItem>
        ))
    }

    useEffect(() => {
        const getPadBranches = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/branch/${padId}`, {
                method: "GET",
                credentials: "include"
            });

            const branchesResponse = await res.json();

            setBranches(branchesResponse)
            const mainBranch = branchesResponse.find((branch: Branch) => branch.id === mainBranchId);

            if (mainBranch) {
                setBranch(mainBranch.name)
            }
        }

        getPadBranches();
    },[mainBranchId])

    return (<div className="w-1/6 mb-5">
        <FormControl style={{ width: '100%' }}>
            <InputLabel>Versão</InputLabel>
            <Select
                labelId="select-branches-label"
                id="select-branches"
                value={branch}
                onChange={handleChange}
            >
                {renderBranches()}
            </Select>
        </FormControl>
    </div>)
}

export default DropdownBranches;