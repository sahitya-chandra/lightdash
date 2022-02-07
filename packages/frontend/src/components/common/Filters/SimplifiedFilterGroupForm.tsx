import { FilterableField, FilterRule } from 'common';
import React, { FC, useCallback } from 'react';
import {
    FilterGroupHeader,
    FilterGroupItemsWrapper,
    FilterGroupWrapper,
} from './FilterGroupForm.styles';
import FilterRuleForm from './FilterRuleForm';

type Props = {
    fields: FilterableField[];
    filterRules: FilterRule[];
    onChange: (value: FilterRule[]) => void;
};

const SimplifiedFilterGroupForm: FC<Props> = ({
    fields,
    filterRules,
    onChange,
}) => {
    const onDeleteItem = useCallback(
        (index: number) => {
            onChange([
                ...filterRules.slice(0, index),
                ...filterRules.slice(index + 1),
            ]);
        },
        [filterRules, onChange],
    );

    const onChangeItem = useCallback(
        (index: number, item: FilterRule) => {
            onChange([
                ...filterRules.slice(0, index),
                item,
                ...filterRules.slice(index + 1),
            ]);
        },
        [filterRules, onChange],
    );

    return (
        <FilterGroupWrapper>
            <FilterGroupHeader>
                <p>All of the following conditions match:</p>
            </FilterGroupHeader>
            <FilterGroupItemsWrapper>
                {filterRules.map((item, index) => (
                    <FilterRuleForm
                        key={item.id}
                        filterRule={item}
                        fields={fields}
                        onChange={(value) => onChangeItem(index, value)}
                        onDelete={() => onDeleteItem(index)}
                    />
                ))}
            </FilterGroupItemsWrapper>
        </FilterGroupWrapper>
    );
};

export default SimplifiedFilterGroupForm;
