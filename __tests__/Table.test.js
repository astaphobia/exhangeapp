import React from 'react'
import { shallow } from 'enzyme'

import Table from '@/components/Table'

describe("Table", () => {
    it("should render perfectly", () => {
        const items = { one: 1, two: 2 }
        const comp = shallow(
            <Table>
                {Object.keys(items).map((key, index) => (
                    <React.Fragment key={index}>
                        <Table.Header row={key}>
                            Mock
                    </Table.Header>
                        <Table.Header row={key}>
                            Up
                    </Table.Header>
                    </React.Fragment>))}
            </Table>
        )
        expect(comp).toMatchSnapshot()
    })
})