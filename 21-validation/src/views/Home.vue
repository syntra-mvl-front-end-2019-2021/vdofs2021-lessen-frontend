<template>
    <div class="home">
        <FormulateForm
            v-model="form"
            :schema="schema"
            @submit="submit"
            :form-errors="formErrors"
            :errors="errors"
        />
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
    data() {
        return {
            form: {
                username: 'test7777',
                email: 'test7777@test.be',
                password: 'test',
                first_name: 'test',
                last_name: '',
                address: 'test',
            },
            formErrors: [],
            errors: {},
            schema: [
                {
                    component: 'FormulateErrors',
                },
                {
                    type: 'text',
                    label: 'Username',
                    name: 'username',
                    validation: 'required',
                },
                {
                    type: 'email',
                    label: 'Email',
                    name: 'email',
                    validation: 'required|email',
                },
                {
                    type: 'password',
                    label: 'Password',
                    name: 'password',
                    validation: 'required',
                },
                {
                    type: 'text',
                    label: 'First name',
                    name: 'first_name',
                    'validation-name': 'First name',
                    validation: 'required',
                },
                {
                    type: 'text',
                    label: 'Last name',
                    name: 'last_name',
                },
                {
                    type: 'textarea',
                    label: 'Address',
                    name: 'address',
                    validation: 'required',
                },
                {
                    type: 'submit',
                    label: 'Submit',
                },
            ],
        };
    },
    methods: {
        submit(data) {
            console.log(data);
            fetch('https://test.pienter.space/jvdv-api/items/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 5uAqP3ju4rtFqbae1QBR',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    return new Promise((resolve, reject) => {
                        response
                            .json()
                            .then((body) => {
                                resolve({
                                    response,
                                    body,
                                });
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                })
                .then((data) => {
                    console.log(data);

                    if (!data.response.ok) {
                        switch (data.body.error.code) {
                            case 204:
                                this.formErrors = [
                                    'Username or email are in use',
                                ];
                                break;
                            case 4:
                                const splitError =
                                    data.body.error.message.split(': ');
                                this.$set(this.errors, splitError[0], [
                                    splitError[1],
                                ]);
                                break;
                        }
                    }

                    console.log('success');
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
