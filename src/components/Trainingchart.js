import React from "react";
import { useState, useEffect } from "react";
import * as _ from "lodash";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";


function Trainingchart (){
    const [trainings, setTrainings] = useState([]);

    useEffect(()=>{
        fetch('https://customerrest.herokuapp.com/gettrainings')
          .then(response=> response.json())
          .then(data=> setTrainings(data))
          .catch(err=>console.error())
      },[])
    
// forming the object to get the data in the correct format
    let data= 
            _(trainings)
            .groupBy('activity')
            .map((activity, index)=>({
                name:'',
                minutes:_.sumBy(activity, 'duration')
            })
            )
            .value()

    const trainingArray=Object.keys(_.groupBy(trainings, 'activity'))
    
    
// mixing the two arrays into one with the proper information for the chart

    const transformation = (dataArray)=>{
        for(let i = 0; i< dataArray.length; i++){
            dataArray[i].name=trainingArray[i]
        }
        return dataArray
    }

    
    return (
      <div>
        <h3> Training statistics</h3>
        <BarChart 
         width={1200}
         height={500}
         margin={{ top: 15, right: 30, left: 150, bottom: 5 }}
         data={transformation(data)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="minutes" fill="#82ca9d" />
        </BarChart>
      </div>
    );
}
export default Trainingchart