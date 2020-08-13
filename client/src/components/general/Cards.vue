<template>
    <div class="card-deck style_count">
        <div class="card bg-warning">
            <div class="card-body text-center">
                <img src="../../assets/images/virus-infected.png" height="50">
                <p class="card-text"></p>Confirmed</p>
                <p class="card-text" id = "confirmed">{{confirmed}}</p>
            </div>
        </div>
        <div class="card bg-primary">
            <div class="card-body text-center">
                <img src="../../assets/images/virus-infected.png" height="50">
                <p class="card-text">Active</p>
                <p class="card-text" id="active">{{active}}</p>
            </div>
        </div>
        <div class="card bg-success">
            <div class="card-body text-center">
                <img src="../../assets/images/virus-infected.png" height="50">
                <p class="card-text">Recovered</p>
                <p class="card-text" id="recovered">{{recovered}}</p>
            </div>
        </div>
        <div class="card bg-danger">
            <div class="card-body text-center">
                <img src="../../assets/images/virus-infected.png" height="50">
                <p class="card-text">Death</p>
                <p class="card-text" id = "death">{{deaths}}</p>
            </div>
        </div>  
    </div>
</template>
<style>
</style>
<script>
export default{
props:['confirmed','active','deaths','recovered']
}
</script>
