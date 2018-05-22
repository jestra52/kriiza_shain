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
                            {{ params }}
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs12 lg6>
                    <v-card light>
                        <v-card-text>
                            {{ params }}
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs12 lg6>
                    <v-card light>
                        <v-card-text>
                            {{ params }}
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs12 lg6>
                    <v-card light>
                        <v-card-text>
                            {{ params }}
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

export default {
    data () {
        return {
            params: this.$route.params
        }
    }
}

</script>

