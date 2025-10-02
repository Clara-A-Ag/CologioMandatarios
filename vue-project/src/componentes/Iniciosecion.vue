<template>
    <div class="Box_1">
    <h1>Sistema de Administracion de Mandatarios de la Provincia de Santa Fe</h1>
    <p>Para utilizar el sistema debe ingresar usuario y la clave que te fue provista para tal fin.No compartas esta información con ninguna persona que no sea la autorizada para ingresar al sistema</p>
</div>
<div class="Box_2">
    <div class="Box_2_Inicio">
        <h1>Identificate para utilizar el sistema</h1>
        <div class="Box_2_Inicio_Usuario">
            <form action="">
            <label for="usuario">Usuario</label>
        <input type="text" placeholder="Ingrese su usuario"></input>
        <label for="clave">Clave</label>
        <input type="password" placeholder="Ingrese su clave"></input>
        <input type="checkbox" id="recordar" name="recordar"></input>
        <label for="recordar">Recordarme</label>    
        <button>Ingresar</button>
</form>
        </div>
        <div class="Box_Parrafo">
            <p>Ingresar tu usuario y clave, luego presiona el boton <b>Ingresar</b></p>
            <ul>
                <li>Tene en cuenta que tanto el usuario y la clave son <b>sensitivas a mayúsculas y minúsculas</b> </li>
                <li>Recordá <b>cerrar la sesión</b> cuando termines de utilizar el sistema</li>
                <li>Si olvidaste tu clave, comunicate con el administrador del sistema</li>
            </ul>
        </div>

</div>
</div>
</template>
<script setup>
</script>



<style scoped>
</style>