import React from 'react';
import {
    Button,
    View,
    Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectRoute,
    changeRoute
} from '../redux/reducer/reducer';

const Root = () => {
    const route = useSelector(selectRoute);
    const dispatch = useDispatch();

    return(
        <View
            style={{
                flex:1,
                justifyContent:"center",
                alignItems: "center"
                }}>
            <Button
                title="button"
                onPress={() => dispatch(changeRoute("form"))}
            ></Button>
            <Text>
                {route}
            </Text>

        </View>
    )
}

export default Root;

