<template>
<v-content>

    <v-jumbotron dark height="auto">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Historial de transacciones</h3>
                    <span class="subheading">
                        <p>Transacciones totales</p>
                    </span>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 lg6>
                    <v-card light>
                        <v-card-text>
                            <p>Recibido de la cuenta {{hola[0]}}</p>
                            <p>Enviado a la cuenta: {{hola[1]}}</p>
                            <p>Se envio: {{hola[2]}}KG de cafe</p>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>

            <!--<v-btn :loading="loading" :disabled="loading" color="success"
            @click="bringtransactions()"
            @click.native="loader = 'loading'"
            >
                Actualizar
            </v-btn>-->
        </v-container>
    </v-jumbotron>

</v-content>
</template>

<script>
import config from '../config';

const apiURL = 'http://' + config.apiHost;
console.log('ETH NETWORK', config.ethNetwork);

const Web3 = require("web3");
const web3 = new Web3();

//import contractVerde from '../output/CafeVerde.json';
//import contractTostado from '../output/CafeTostado.json';

const contractVerde = require("../output/CafeVerde.json");
const contractTostado = require("../output/CafeTostado.json");
web3.setProvider(new web3.providers.HttpProvider(config.ethNetwork));
const abiDecoder = require('abi-decoder');
const testABI = require("../output/CafeVerde.json");
abiDecoder.addABI(testABI.abi);

export default {
    data () {
        return {
            params: this.$route.params,
            hola: []
        }
    },
    methods:{
         begin: function() {
             var transaction = web3.eth.getTransaction(this.$data.params.param);
             const testData = transaction.input;
             const decodedData = abiDecoder.decodeMethod(testData);  
             this.$data.hola.push(transaction.from);
             this.$data.hola.push(transaction.to);
             this.$data.hola.push(decodedData.params[1].value)
         }
    },
    beforeMount() {
    this.begin();
  }
}

</script>

