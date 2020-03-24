<template>
    <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            labelPosition="top"
            :inline="true"
            class="demo-ruleForm"
    >
        <el-row :gutter="59">
            <el-col :span="12">
                <el-form-item :label="$t('joinUs.surname')" prop="surname">
                    <el-input class="edit-input" v-model="ruleForm.surname"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('joinUs.givenName')" prop="givenName">
                    <el-input class="edit-input" v-model="ruleForm.givenName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="59">
            <el-col :span="12">
                <el-form-item :label="$t('joinUs.email')" prop="email">
                    <el-input class="edit-input" v-model="ruleForm.email"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('joinUs.phone')" prop="phoneNumber" required>
                    <el-row class="edit-tel">
                        <el-col :span="8">
                            <el-input class="edit-tel1" v-model="phone1"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">—</el-col>
                        <el-col :span="14">
                            <el-input class="edit-tel2" v-model="phone2"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "test.vue",
        data () {
            return {
                ruleForm: {
                    surname: "",
                    givenName: "",
                    email: "",
                    phoneNumber: ""
                },
                phone1: "",
                phone2: ""
            }
        },
        computed: {
            rules () {
                var validateSurnmae = (rule, value, callback) => {
                    let reg = /^[A-Za-z]+$/
                    if (!reg.test(value)) {
                        callback(new Error(this.$t('joinUs.surnameErr3')))
                    } else {
                        callback()
                    }
                };
                var validateGivenName = (rule, value, callback) => {
                    let reg = /^[\u4e00-\u9fa5]+$/
                    if (!reg.test(value)) {
                        callback(new Error(this.$t('joinUs.givenNameErr3')))
                    } else {
                        callback()
                    }
                };return {
                    surname: [
                        { required: true, message: this.$t('joinUs.surnameErr1'), trigger: "blur" },
                        { validator: validateSurnmae, trigger: "blur" },
                        { min: 1, max: 20, message: this.$t('joinUs.surnameErr2'), trigger: "blur" }
                    ],
                    givenName: [
                        { required: true, message: this.$t('joinUs.givenNameErr1'), trigger: "blur" },
                        { validator: validateGivenName, trigger: "blur" },
                        { min: 1, max: 20, message: this.$t('joinUs.givenNameErr2'), trigger: "blur" }
                    ],
                    email: [
                        { required: true, message: this.$t('joinUs.emailError'), trigger: "blur" },
                        {
                            type: "email",
                            message: this.$t('joinUs.emailError'),
                            trigger: ["blur", "change"]
                        }
                    ],
                    phoneNumber: [
                        { required: true, message: this.$t('joinUs.phoneNumberError1'), trigger: "blur" },
                        { type: 'number', message: this.$t('joinUs.phoneNumberError2'), trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
            ceshi(){
                axios.post('',)
            }
        }

    }
</script>

<style scoped>

</style>
