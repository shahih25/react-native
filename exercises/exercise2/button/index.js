import PropTypes from 'prop-types';
import React, { Component, ReactPropTypes } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import BaseStyles, { Danger, Default, Info, Success } from './styles';

const { bool, func, any } = PropTypes

class Button extends Component {
    static prototypes = {
        children: any,
        danger: bool,
        info: bool,
        // style: View.propTypes.style,
        success: bool,
        onPress: func
    }

    getTheme() {
        const { danger, info, success } = this.props;

        if (info) {
            return Info;
        }
        if (danger) {
            return Danger;
        }
        if (success) {
            return Success
        }

        return Default;
    }

    render() {
        const theme = this.getTheme();
        const {
            children,
            onPress,
            style,
            rounded
        } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[
                    BaseStyles.main,
                    theme.main,
                    rounded ? BaseStyles.rounded : null,
                    style
                ]}
                onPress={onPress}
            >
                <Text style={[BaseStyles.label, theme.label]}>{children}</Text>
            </TouchableOpacity>
        )
    }
}

export default Button;