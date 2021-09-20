import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs';

const Routes = () => {
    return (
        <NavigationContainer style={{position: 'relative'}}>
            <Tabs />
        </NavigationContainer>
    )
}

export default Routes;