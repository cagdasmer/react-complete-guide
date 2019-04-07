import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { TreeSelect } from 'antd';

import { treeData } from './constants';

const SHOW_TYPE = TreeSelect.SHOW_CHILD;

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) =>
      (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

class Demo extends React.Component {
  /* state = {
    value: [
      {value:'a-d-d_1', label:''}, 
      {value:'a-d-d_2', label:''}
    ],
  } */

  state = { 
    value: ['a-d-d_1', 'a-d-d_2'],
    queryForm: [] 
  }


  onChange = (value, label, extra) => {
    let serviceTypes = [];
    let services = [];

    value.map(item => {
      let arr = item.split('-');

      if(services.length == 0){
        serviceTypes.push(arr[0]);
        services.push({
          service: arr[0], 
          neTypes:[
            {
              name: arr[1],
              elements: [arr[2]]
            }
          ]
        })
      } else if(services.length > 0){
        let neTypes = []
      }
    })
    

    
      console.log(value, label, extra);

 /* STRUCTURE : Service
                  |
        NE Type___|___NE Type
  NE-1__|__NE-2       NE-1__|__NE-2

  */               
 //     console.log(extra);



      /* if (extra.checked && extra.triggerNode.isLeaf()){
        let arr = extra.triggerValue.split('-');
        console.log(arr);
      }
      else if(extra.checked){

      } */
 //     console.log(extra.allCheckedNodes);

    /* treeData.forEach(service => {
      if(service.value === value[0]){
        console.log(service);
      }
    }) */

    this.setState({ value });
  }

  onTreeExpand = (expandedKeys) => {
    console.log(expandedKeys);
  }


  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      // onTreeExpand: this.onTreeExpand,
      treeCheckable: true,
      showCheckedStrategy: SHOW_TYPE,
      searchPlaceholder: 'Please select',
      allowClear: true,
      //labelInValue:true,
      style: {
        width: 300,
      },
    };
    return <TreeSelect {...tProps} />;
  }
}

export default Demo;
