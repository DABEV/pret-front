<template>
    <div class="backimage bg-component">
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Access',
    components:{
    }
}
</script>


<style>
.backimage{
    background-image:linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('https://wallpaperaccess.com/full/1393206.jpg');
    height: 757px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}
.bg-component {
text-align: center;
display: flex;
justify-content: center;
align-items: center;
}
</style>