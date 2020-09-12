<template>
    <div>
        <app-cards :confirmed="confirmed" :active="active" :deaths="deaths" :recovered="recovered"></app-cards>
        <div class="body-mapdiv">
            <div class="mapdiv">
                <component v-bind:is="currentState"></component>
            </div>
            <div class="style_map">
                <h1>{{ stateName }}</h1>
                <div class="chart" style="background-color:white;">
                    <app-line-chart v-if="isLoaded" :chartData="chartData_confirmed" :labels="labels" bgcolor="#ffc107" title="Confirmed"></app-line-chart>
                </div>
                               
            </div>    
            <div class="style_map">
                <div class="chart" style="background-color:white;">
                    <app-line-chart v-if="isLoaded" :chartData="chartData_recovered" :labels="labels" bgcolor="#28a745" title="Recovered"></app-line-chart>
                </div>
                <div class="chart" style="background-color:white;">
                    <app-line-chart  v-if="isLoaded" :chartData="chartData_deaths" :labels="labels" bgcolor="#dc3545" title="Deceased"></app-line-chart>
                </div>   
            </div>              

        </div>
        <div class="style_table" style="width:60%;margin:auto;">
             <vue-table-dynamic :params="params"></vue-table-dynamic>
        </div>
    </div>

    
    </div>
</template>
<style scoped>
</style>
<script>
import Cards from './Cards.vue';
import LineChart from './LineChart.vue'
import GJ from '../states/Gujarat.vue'
import AP from '../states/AndhraPradesh.vue'
import AN from '../states/AndmanAndNicobarIslands.vue'
import AR from '../states/ArunachalPradesh.vue'
import AS from '../states/Assam.vue'
import GA from '../states/Goa.vue'
import Home from '../general/Home.vue'
import BR from '../states/Bihar.vue'
import JK from '../states/JammuKashmir.vue'
import CH from '../states/Chandigarh.vue'
import CT from '../states/Chhatisgarh.vue'
import DD from '../states/DamanAndDiu.vue'
import DL from '../states/Delhi.vue'
import DN from '../states/DadraAndNagarHaveli.vue'
import HP from '../states/HimachalPradesh.vue'
import HR from '../states/Haryana.vue'
import JH from '../states/Jharkhand.vue'
import KA from '../states/Karnataka.vue'
import KL from '../states/Kerela.vue'
import LD from '../states/Lakshadweep.vue'
import MH from '../states/Maharashtra.vue'
import ML from '../states/Meghalaya.vue'
import MN from '../states/Manipur.vue'
import MZ from '../states/Mizoram.vue'
import MP from '../states/MadhyaPradesh'
import NL from '../states/Nagaland.vue'
import OR from '../states/Odisha.vue'
import PB from '../states/Punjab.vue'
import PY from '../states/Puducherry.vue'
import RJ from '../states/Rajasthan.vue'
import SK from '../states/Sikkim.vue'
import TG from '../states/Telangana.vue'
import TN from '../states/Tamilnadu.vue'
import TR from '../states/Tripura.vue'
import UP from '../states/Uttarpradesh.vue'
import UT from '../states/Uttarakhand.vue'
import WB from '../states/WestBengal.vue'



import axios from 'axios'
import VueTableDynamic from 'vue-table-dynamic'
var codeToState=
{
    TT:'India',
    GJ:'Gujarat',
    AP:'Andhra Pradesh',
    AN:'Andman Nicobar',
    AR:'Arunachal Pradesh',
    AS:'Assam',
    GA:'Goa',
    BR:'Bihar',
    JK:'Jammu Kashmir',
    CH:'Chandigarh',
    CT:'Chhatisgarh',
    DD:'Daman and Diu',
    DL:'Delhi',
    DN:'Dadra And Nagar Haveli',
    HP:'Himachal Pradesh',
    HR:'Haryana',
    JH:'Jharkhand',
    KA:'Karnataka',
    KL:'Kerela',
    LD:'Lakshadweep',
    MH:'Maharashtra',
    ML:'Meghalaya',
    MN:'Manipur',
    MZ:'Mizoram',
    MP:'MadhyaPradesh',
    NL:'Nagaland',
    OR:'Odisha',
    PB:'Punjab',
    PY:'Puducherry',
    RJ:'Rajasthan',
    SK:'Sikkim',
    TG:'Telangana',
    TN:'Tamil Nadu',
    TR:'Tripura',
    UP:'Uttar Pradesh',
    UT:'Uttarakhand',
    WB:'West Bengal'
};


export default{
    data:function(){
        return {
            currentState:this.curState,
            raw_data:null,
            confirmed:0,
            active:0,
            deaths:0,
            recovered:0,
            chartData_confirmed:[],
            chartData_recovered:[],
            chartData_deaths:[],
            labels:[],
            isLoaded:0,
            stateName:codeToState[this.curState],
            params:{
                data:[
                    ['State Code','District Name','Confirmed','Recovered','Deceased']
                ],
                header:'row',
                stripe:'true',
                enableSearch:true,
                sort:[1,2,3,4],
                pagination:true
            }

        };
    },
    props:{
        curState:{
            type:String,
            default:null
        }
    },
    components:{
        'app-cards':Cards,
        'app-line-chart':LineChart,
        'GJ':GJ,
        'AP':AP,
        'AN':AN,
        'AS':AS,
        'GA':GA,
        'AR':AR,
        'DL':DL,
        'BR':BR,
        'JK':JK,
        'CH':CH,
        'CT':CT,
        'DD':DD,
        'DL':DL,
        'DN':DN,
        'HP':HP,
        'HR':HR,
        'JH':JH,
        'JK':JK,
        'KA':KA,
        'KL':KL,
        'LD':LD,
        'MH':MH,
        'ML':ML,
        'MN':MN,
        'MP':MP,
        'MZ':MZ,
        'NL':NL,
        'OR':OR,
        'PB':PB,
        'PY':PY,
        'RJ':RJ,
        'SK':SK,
        'TG':TG,
        'TN':TN,
        'TR':TR,
        'UP':UP,
        'UT':UT,
        'WB':WB,
        VueTableDynamic
    },
    mounted(){
            axios
            .get('https://api.covid19india.org/v4/data.json')
            .then(response=>{
                this.raw_data=response.data;
             //console.log(this.raw_data);
             this.processData();   
            });
            axios
            .get('https://api.covid19india.org/v4/data-all.json')
            .then(response=>{
                //console.log(response.data);
            
                let d = new Date();
                let day,month,year,cnt=0;
                day=d.getDate();
                if(day<10)
                    day='0'+day;
                month=d.getMonth()+1;   
                if(month<10)
                    month='0'+month;
                year=d.getUTCFullYear();
                let fd=year+'-'+month+'-'+day;
                //console.log(fd);
                let c=this.curState
                while(cnt<5){
                    //console.log(fd);
                    if(response.data[fd]){
                        
                        this.labels[cnt]=fd;
                        
                        this.chartData_confirmed[cnt]=response.data[fd][c].total["confirmed"]
                        this.chartData_recovered[cnt]=response.data[fd][c].total["recovered"]
                        this.chartData_deaths[cnt]=response.data[fd][c].total["deceased"]
                        
                        //console.log(response.data[fd].TT.total);
                        d.setDate(d.getDate()-7);
                        cnt++;
                    }
                    else{
                        d.setDate(d.getDate()-1);
                    }
                    day=d.getDate();
                    if(day<10)
                        day='0'+day;
                    month=d.getMonth()+1;   
                    if(month<10)
                        month='0'+month;
                    year=d.getUTCFullYear();
                    fd=year+'-'+month+'-'+day;
                }
                this.isLoaded=true;
                //console.log(this.labels);
            });
    },
    methods: {
        processData:function(){
            let cnt=0,wk=0;
           for(let x in this.raw_data)
           {
               //console.log(x);
              if(x==this.curState)
              {
                  this.confirmed=this.raw_data[x].total.confirmed;
                  this.active=this.raw_data[x].total.confirmed-this.raw_data[x].total.deceased-this.raw_data[x].total.recovered;
                  this.deaths=this.raw_data[x].total.deceased;
                  this.recovered=this.raw_data[x].total.recovered;
                  for(let t in this.raw_data[x].districts)
                {
                    //console.log(this.raw_data[x].districts[t].total);
                    this.params.data.push([x,t,parseInt(this.raw_data[x].districts[t].total.confirmed),parseInt(this.raw_data[x].districts[t].total.recovered),parseInt(this.raw_data[x].districts[t].total.deceased==null?0:this.raw_data[x].districts[t].total.deceased)]);
                }
              }
           }
        },
        change:function(curState){
            this.$parent.change(curState);
        }
    }

}

</script>

