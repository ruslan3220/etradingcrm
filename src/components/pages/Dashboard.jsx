import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { logDOM } from '@testing-library/react';

const Dashboard = () => {

  const [isMainWorks, setIsMainWork] = useState([]);
  const [soldGet, setSoldGet] = useState([])
  const [soldGive, setSoldGive] = useState([])
  const [finished, setFinished] = useState([])
  const [order, setOrder] = useState([])
  const [orderTrue, setOrderTrue] = useState([])
  const [orderFalse, setOrderFalse] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.etradingcrm.uz/api/Attendance/All');
        setIsMainWork(response.data);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.etradingcrm.uz/api/BSProduct/All?Category=1');
        setSoldGet(response.data);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.etradingcrm.uz/api/BSProduct/All?Category=2');
        setSoldGive(response.data);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.etradingcrm.uz/api/FinishedProduct');
        setFinished(response.data);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.etradingcrm.uz/api/Order/All');
        setOrder(response.data);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.etradingcrm.uz/api/Order/All?IsSubmitted=true');
        setOrderTrue(response.data);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.etradingcrm.uz/api/Order/All?IsSubmitted=false');
        setOrderFalse(response.data);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  const mainWorkTrue = isMainWorks.filter(item => item.isMainWork === true)
  const workTrue = mainWorkTrue.map(user => user.isMainWork).length
  const mainWorkFalse = isMainWorks.filter(item => item.isMainWork === false)
  const workFalse = mainWorkFalse.map(user => user.isMainWork).length
  
const soldGetNum = soldGet.map(item => item.category).length
const soldGiveNum = soldGive.map(item => item.category).length

const data = [
  { name: 'Sotib olingan', value: soldGetNum },
  { name: 'Sotilgan', value: soldGiveNum },
  { name: 'Tayyor bo`lgan maxsulot', value: finished.length },

];

const data2 = [
  { name: 'Sotib olingan', value: soldGetNum },
  { name: 'Sotilgan', value: soldGiveNum },
  { name: 'Tayyor bo`lgan maxsulot', value: finished.length },
  { name: 'Buyurtmalar', value: order.length },
];

const data1 = [
  { name: 'Bor', value: workTrue },
  { name: 'Yo`q', value: workFalse },
  
];

const data3 = [
  { name: 'Tayyor', value: orderTrue.length },
  { name: 'Tayyor emas', value: orderFalse.length },
  
];



const COLORS = ['#2196f3', '#4caf50', '#f44336', '#ff0', '#173F77', '#000'];
const COLORS1 = ['greenYellow', 'red'];


  return (
    <div className='dashboard'>


<div style={{display: "flex", flexDirection:"column", alignItems:"center"}}> 

      <div  style={{display: "flex", alignItems: "center", justifyContent:"space-evenly", gap:"118px", flexWrap: "wrap"}}>

          <div style={{marginLeft:"10px"}}>
          <p style={{display:"flex", gap:"5px", alignItems:"center"}}><div style={{background:"#2196f3", width:"15px", height:"20px"}}></div>Sotib olingan</p>
          <p style={{display:"flex", gap:"5px", alignItems:"center"}}><div style={{background:"#4caf50", width:"15px", height:"20px"}}></div>Sotilgan</p>
          <p style={{display:"flex", gap:"5px", alignItems:"center"}}><div style={{background:"red", width:"15px", height:"20px"}}></div>Tayyor bo'lgan</p>
          </div>
        <div className='pieChartOne'>
            <PieChart  width={350} height={350}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                stroke="#fff"
                strokeWidth={5}
                animationBegin={0} // Animatsiya boshlanish vaqti
                animationDuration={2000} // Animatsiya davomiyligi (mili-soniyada)
                style={{ outline:"none"}}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie >
              {/* <Legend /> */}
              <Tooltip />
            </PieChart>
        </div>

          <div className='attendance-div'>
        <PieChart width={350} height={350}>
        <Pie
          style={{ outline:"none"}}
          data={data1}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          stroke="#fff"
          strokeWidth={5}
          animationBegin={0} 
          animationDuration={2000} 
        >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
        </div>
        
        <div style={{marginLeft:"10px"}}>
          <p style={{display:"flex", gap:"5px", alignItems:"center"}}><div style={{background:"greenYellow", width:"15px", height:"20px"}}></div>Bor</p>
          <p style={{display:"flex", gap:"5px", alignItems:"center"}}><div style={{background:"red", width:"15px", height:"20px"}}></div>Yo'q</p>
          </div>
         

      </div>


     <div className='finish' >
     <p style={{display:"flex", gap:"5px", alignItems:"center"}}><div style={{background:"#2196f3", width:"15px", height:"20px"}}></div>Tayyor</p>
        <div className='finish-div'>
        <PieChart width={300} height={300}>
          <Pie
            style={{ outline:"none",           display:"flex",  alignItems : "center"}}
 
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            stroke="#fff"
            strokeWidth={5}
            animationBegin={0} 
            animationDuration={2000} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </div>
      <p style={{display:"flex", gap:"5px", alignItems:"center"}}><div style={{background:"#4caf50", width:"15px", height:"20px"}}></div>Tayyor emas</p>

     </div>

              

    
    



    </div>

{/* <div className="charts">


<BarChart width={350} height={250} data={data2} style={{ outline:"none"}}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" style={{display: "none" }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#173F77" />
    </BarChart>

  
</div> */}



    </div>

  );
};

export default Dashboard;