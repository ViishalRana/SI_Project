<script>
import {Bar} from "vue-chartjs"
export default{
    props:{
        chartData:{
            type:Array,
            default:null
        },
        labels:{
            type:Array,
            default:null
        },
        title:{
            type:String,
            default:null
        },
        bgcolor:{
            type:String,
            default:'#f1c40f'
        }

    },
    extends:Bar,
    mounted(){
        this.renderChart({
            labels:this.labels,
            datasets:[
                {
                    label:this.title,
                    data:this.chartData,
                    backgroundColor: this.bgcolor,
                    minBarLength: 100,
                    fill:false
                }
            ]

        },{responsive:true,maintainAspectRatio:false});
    }

}
</script>