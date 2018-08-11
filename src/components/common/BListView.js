/**
 * Created by user on 16/6/2.
 */
import React,{
    Component,
} from 'react'

import {
    View,
    StyleSheet,
    ListView,
    Dimensions,
    Platform,
} from 'react-native';
import CommonStyle from '../CommonStyle'
// type Rows = Array<Object>;
// type RowsAndSections = {
//     [sectionID: string]: Object;
// };
//＼
// export type Data = Rows | RowsAndSections;
// type RenderElement = () => ?ReactElement;

// type Props = {
//     data: ?Data;
// renderEmptyList?: ?RenderElement;
// minContentHeight: number;
// contentInset: { top: number; bottom: number; };
// };

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;

export default class BListView extends Component {
    props: Props;

    constructor(props: Props) {
        super(props);
        let dataSource = new ListView.DataSource({
            getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
            getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) =>  s1 !== s2,
        });

        this.state = {
            contentHeight: 0,
            dataSource: cloneWithData(dataSource, props.data),
        };

        this.renderFooter = this.renderFooter.bind(this);
        this.onContentSizeChange = this.onContentSizeChange.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        let ds =cloneWithData(this.state.dataSource, nextProps.data)
        this.setState({
            dataSource: ds,
        });
        // if (this.props.data !== nextProps.data) {
        //     let ds =this.setData(this.state.dataSource, nextProps.data)
        //     this.setState({
        //         dataSource: ds,
        //     });
        // }
    }

    render() {
        const {contentInset} = this.props;
        const bottom = contentInset.bottom +
            Math.max(0, this.props.minContentHeight - this.state.contentHeight);
        return (
            <ListView
                initialListSize={10}
                pageSize={LIST_VIEW_PAGE_SIZE}
                ref="listview"
                dataSource={this.state.dataSource}
                renderFooter={this.renderFooter}
                contentInset={{bottom, top: contentInset.top}}
                onContentSizeChange={this.onContentSizeChange}
                enableEmptySections={true}
                {...this.props}
            />
        );
    }

    onContentSizeChange(contentWidth: number, contentHeight: number) {
        if (contentHeight !== this.state.contentHeight) {
            this.setState({contentHeight});
        }
    }

    scrollTo(...args: Array<any>) {
        this.refs.listview.scrollTo(...args);
    }

    getScrollResponder(): any {
        return this.refs.listview.getScrollResponder();
    }

    renderFooter():  ReactElement{
    if (this.state.dataSource.getRowCount() === 0) {
        return this.props.renderEmptyList && this.props.renderEmptyList();
    }
    return this.props.renderFooter && this.props.renderFooter();
}
}

BListView.defaultProps = {
    data: [],
    contentInset: { top: 0, bottom: 0 },
    // TODO: This has to be scrollview height + fake header
    minContentHeight: Dimensions.get('window').height + 20,
    renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={''+rowID+sectionID} />,
};

function cloneWithData(dataSource: ListView.DataSource, data) {


    if (!data) {
        return dataSource.cloneWithRows([]);
    }
    if (Array.isArray(data)) {
        let newData=[];
        return dataSource.cloneWithRows(newData.concat(data));
    }
    let newData ={};
    Object.assign(newData,data);
    return dataSource.cloneWithRowsAndSections(newData);
}

var styles = StyleSheet.create({
    separator: {
        backgroundColor: CommonStyle.color_light_gray,
        height: 0.5,
        marginLeft:15,
    },
});
