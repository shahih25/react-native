import PropTypes from 'prop-types';
import React, { Component, ReactPropTypes } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import BaseStyles, { Danger, Default, Info, Success } from './styles';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const Button = ({ onPress, size, title, rounded, backgroundColor }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
            BaseStyles.main,
            size === "sm" && {
                paddingHorizontal: 8,
                paddingVertical: 6,
                elevation: 6
            },
            size === "md" && BaseStyles.md_size,
            size === "lg" && BaseStyles.lg_size,
            rounded && BaseStyles.rounded,
            backgroundColor && { backgroundColor }
            ]}
        >
            <Text style={[BaseStyles.label, size === "sm" && { fontSize: 14 }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;