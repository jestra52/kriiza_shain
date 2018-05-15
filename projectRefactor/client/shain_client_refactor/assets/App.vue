<template>
    <v-app light>
        <!--<v-navigation-drawer
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        fixed
        app
        >
        <v-list>
            <v-list-tile
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
            >
            <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar>
        <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn
            icon
            @click.native.stop="miniVariant = !miniVariant"
        >
            <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn
            icon
            @click.native.stop="clipped = !clipped"
        >
            <v-icon>web</v-icon>
        </v-btn>
        <v-btn
            icon
            @click.native.stop="fixed = !fixed"
        >
            <v-icon>remove</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            @click.native.stop="rightDrawer = !rightDrawer"
        >
            <v-icon>menu</v-icon>
        </v-btn>
        </v-toolbar>
        <v-content>
        <v-container fluid>
            <v-slide-y-transition mode="out-in">
            <router-view></router-view>
            </v-slide-y-transition>
        </v-container>
        </v-content>
        <v-navigation-drawer
        temporary
        :right="right"
        v-model="rightDrawer"
        fixed
        >
        <v-list>
            <v-list-tile @click.native="right = !right">
            <v-list-tile-action>
                <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
            </v-list-tile>
        </v-list>
        </v-navigation-drawer>
        <v-footer :fixed="fixed" app>
        <span>&copy; 2017</span>
        </v-footer>-->
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
            <v-list dense>
                <v-list-tile @click="">
                    <v-list-tile-action>
                    </v-list-tile-action>
                    <v-list-tile-content>
                    <v-list-tile-title>
                        dsfgdsfg
                    </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <template v-for="item in items">
                <v-layout
                    v-if="item.heading"
                    :key="item.heading"
                    row
                    align-center
                >
                    <v-flex xs6>
                    <v-subheader v-if="item.heading">
                        {{ item.heading }}
                    </v-subheader>
                    </v-flex>
                    <v-flex xs6 class="text-xs-center">
                    <a href="#!" class="body-2 black--text">EDIT</a>
                    </v-flex>
                </v-layout>
                <v-list-group
                    v-else-if="item.children"
                    v-model="item.model"
                    :key="item.text"
                    :prepend-icon="item.model ? item.icon : item['icon-alt']"
                    append-icon=""
                >
                    <v-list-tile slot="activator">
                    <v-list-tile-content>
                        <v-list-tile-title>
                        asdfsadf
                        </v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile
                    v-for="(child, i) in item.children"
                    :key="i"
                    @click=""
                    >
                    <v-list-tile-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                        {{ child.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>
                <v-list-tile v-else :key="item.text" @click="">
                    <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                    <v-list-tile-title>
                        afdgdfg
                    </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </template>
            </v-list>
            </v-navigation-drawer>
        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="blue-grey darken-1"
            dark
            app
            fixed
            >
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">SHAIN</span>
            </v-toolbar-title>
            <v-text-field
                flat
                solo-inverted
                prepend-icon="search"
                label="Search"
                class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-toolbar class="blue-grey darken-1" app>
            <v-toolbar-title class="white--text">SHAIN</v-toolbar-title>
        </v-toolbar>



        <v-content>
            <section>
                <v-parallax src="https://www.pandasecurity.com/spain/mediacenter/src/uploads/2017/09/IMG-MC-blockchain.jpg">
                    <v-layout column align-center justify-center class="white--text">
                        <h1 class="white--text mb-2 display-1 text-xs-center">Bienvenido a SHAIN</h1>
                        <div class="subheading mb-3 text-xs-center">El lugar donde puedes comprobar la legitimidad de tu producto</div>

                    </v-layout>
                </v-parallax>
            </section>

            <v-container fluid>
                <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-container>

            <section>
                <v-parallax src="https://www.pandasecurity.com/spain/mediacenter/src/uploads/2017/09/IMG-MC-blockchain.jpg" height="380">
                    <v-layout column align-center justify-center>
                        <div class="headline white--text mb-3 text-xs-center">Web development has never been easier</div>
                        <em>Kick-start your application today</em>
                        <v-btn
                        class="blue lighten-2 mt-5"
                        dark
                        large
                        href="/pre-made-themes"
                        >
                        Get Started
                        </v-btn>
                    </v-layout>
                </v-parallax>
            </section>
        </v-content>



        <section>
            <v-container grid-list-xl>
            <v-layout row wrap justify-center class="my-5">
                <v-flex xs12 sm4>
                <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Creado por Kriiza</div>
                    </v-card-title>
                    <v-card-text>
                    Grupo de estudiantes de ingeniería de sistemas de la Universidad EAFIT,
                    responsable de idear e implementar el proyecto Shain, el cual consiste en darle
                    un valor agregado a los productos del café y una seguridad al consumidor.
                    </v-card-text>
                </v-card>
                </v-flex>
                <v-flex xs12 sm4 offset-sm1>
                <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Contact us</div>
                    </v-card-title>
                    <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    </v-card-text>
                    <ul class="list-unstyled">
                            <li>
                                <a href="https://github.com/jestra52">Juan Carlos Estrada Alvarez</a>
                            </li>
                            <li>
                                <a href="https://github.com/NoNameOriginal">Christian Londoño Cañas</a>
                            </li>
                            <li>
                                <a href="https://github.com/jlondo96">Juan Pablo Londoño Botina</a>
                            </li>
                            <li>
                                <a href="https://github.com/gfernan6">Geralin Fernandez Bedoya</a>
                            </li>
                        </ul>
                    <v-list class="transparent">
                        <v-list-tile>
                            <a href="https://github.com/jestra52">Juan Carlos Estrada Alvarez</a>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>
                            <v-icon class="blue--text text--lighten-2">place</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                            <v-list-tile-title>Chicago, US</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>
                            <v-icon class="blue--text text--lighten-2">email</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                            <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
                </v-flex>
            </v-layout>
            </v-container>
        </section>

        <v-footer class="blue darken-2">
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <div class="white--text ml-3">© 2018 Copyright</div>
                </v-flex>
            </v-layout>
        </v-footer>




    </v-app>
</template>

<script>
    import Meta from 'mixins/meta'

    export default {
        mixins: [Meta],

        data () {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                items: [
                    { icon: 'apps', title: 'Welcome', to: '/' },
                    { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Vuetify.js'
            }
        }
    }
</script>
