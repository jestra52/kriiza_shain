<template>
    <div id="index">
        <div id="login" class="form-login">
        <div id="topBar">
            <h3 id="titlePP">SHAIN</h3>
            <table id="options" align="right" name="options">
                <tr>
                    <th>
                        <router-link to="/index">
                            <a class="btn btn-light">
                                <span class="btn btn-light btnProfile">Inicio</span> 
                            </a>
                        </router-link>
                    </th>
                    <th>
                        <router-link to="/">
                            <a class="btn btn-light btnProfile">
                                <span class="btn btn-light" @click="logout()">Cerrar sesión</span> 
                            </a>
                        </router-link>
                    </th>
                    <th>
                        <router-link to="/signup">
                            <a class="btn btn-light btnProfile">
                                <span class="btn btn-light">Crear cuenta</span> 
                            </a>
                        </router-link>
                    </th>
                </tr>
            </table>
        </div>
        <div id="cafeVerdeRow" class="row" style="float:left; width:49%;">
            <div class="col-sm-6 col-sm-push-3 col-md-4 col-md-push-4" style="width:49%;">
                <table cellspacing="90">
                <tr style="width:500px;border:1px solid black">
                    <td style="width:50%; height:50%;"> 
                    <div class="panel panel-default">
                        <div class="panel-heading" >
                        <h3 class="panel-title">Cafe Verde</h3>
                        </div>
                        <div class="panel-body">
                        <h4 style="margin-top:44px;">Cafe</h4>
                        <strong>Cantidad</strong>:
                        <span id="cafeVerde"></span> KG
                        <br/>
                        <br/>
                        <h4>Enviar a</h4>
                        <select class="form-control" id="destinoCafeVerde">
                            <option value="0xf17f52151EbEF6C7334FAD080c5704D77216b732">FEDERACIÓN DE CAFE</option>
                            <option value="0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef">INTERMEDIARIO 1</option>
                            <option value="0x821aEa9a577a9b44299B9c15c88cf3087F3b5544">INTERMEDIARIO 2</option>
                            <option value="0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2">INTERMEDIARIO 3</option>
                        </select>
                        <input type="text" class="form-control" id="cantidadCafeVerde" placeholder="Cantidad" style="margin-top:2%;" />
                        <button class="btn btn-primary" id="transferirCafeVerde" type="button" style="margin-top:2%;" >Transferir</button>
                        </div>
                    </div>
                    </td>
                </tr>
                </table>
            </div>
            </div>
            <div id="cafeTostadoRow" class="row" style="float:left; width:49%;">
            <div class="col-sm-6 col-sm-push-3 col-md-4 col-md-push-4" style="width:49%;">
                <table cellspacing="90" >
                    <tr style="width:500px;border:1px solid black">
                        <td style="width:50%;">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h3 class="panel-title" >Cafe Tostado</h3>
                                </div>
                                <div class="panel-body">
                                <select class="form-control" id="GranoMolido">
                                    <option value="GRANO">Grano</option>
                                    <option value="MOLIDO">Molido</option>
                                </select>
                               <h4>Cafe</h4>
                                <strong>Cantidad</strong>:
                                <span id="cafeTostado"></span> KG
                                <br/>
                                <br/>
                                <h4>Enviar a:</h4>
                                <select class="form-control" id="destinoCafeTostado">
                                    <option value="0xf17f52151EbEF6C7334FAD080c5704D77216b732">FEDERACIÓN DE CAFE</option>
                                    <option value="0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef">INTERMEDIARIO 1</option>
                                    <option value="0x821aEa9a577a9b44299B9c15c88cf3087F3b5544">INTERMEDIARIO 2</option>
                                    <option value="0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2">INTERMEDIARIO 3</option>
                                </select>
                                <input type="text" class="form-control" id="cantidadCafeTostado" placeholder="Cantidad" style="margin-top:2%;"/>
                                <button class="btn btn-primary" id="transferirCafeTostado" type="button" style="margin-top:2%;">Transferir</button>
                            </div>
                        </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <p id="demo"></p>
        <div  id="botBar">
            <h5 id="creado"> Creado por la compañia Kriiza </h5>
            <table id="infoBot">
                <tr>
                    <th id="derechos">
                        <h5>Todos los derechos reservados   2018</h5>
                    </th>
                </tr>
            </table>
        </div>
    </div>
</template>


<script>
import {mapActions} from 'vuex';
export default {
    data () {
        return {
        }
    },
    
    methods: {
        logout () { 
            makeToken('')
        },
        ...mapActions([
            'makeToken'
        ])
    }
}
</script>

<style scoped>
</style>