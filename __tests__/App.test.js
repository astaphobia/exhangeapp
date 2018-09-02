import React from 'react'
import {shallow} from 'enzyme'

import App from '@/App'

describe("App", () => {
    it("should render perfectly", () => {
        const comp = shallow(<App debug/>)
        expect(comp).toMatchSnapshot()
    })
})