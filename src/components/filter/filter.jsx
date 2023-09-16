import React from 'react';
import PropTypes from 'prop-types';
import {Label, Input } from './filter.module';

export const Filter = ({ value, ChangeFilter }) => {
  return (
    <div>
      <Label>
        Find contacts by name
        <Input type="text" value={value} onChange={ChangeFilter} />
      </Label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  ChangeFilter: PropTypes.func.isRequired,
};
