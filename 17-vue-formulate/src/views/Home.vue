<template>
    <div class="home">
        <FormulateForm v-model="formValues">
            <FormulateInput
                type="autocomplete"
                name="character"
                label="Character"
                validation="required"
            />
            <FormulateInput
                type="password"
                label="Password"
                validation="required|min:8,length"
                validation-name="wachtwoord"
                name="password"
            />
            <FormulateInput
                type="password"
                label="Confirm"
                name="password-confirm"
                validation="required|confirm:password"
            />
            <FormulateInput
                type="checkbox"
                name="accept"
                label="Accept privacy policy"
                :options="{
                    first: 'First',
                    second: 'Second',
                    third: 'Third',
                    fourth: 'Fourth',
                }"
            />
            <FormulateInput
                type="radio"
                name="radio"
                label="Accept privacy policy"
                :options="{
                    first: 'First',
                    second: 'Second',
                    third: 'Third',
                    fourth: 'Fourth',
                }"
            />
            <FormulateInput type="group" name="group" :repeatable="true">
                <FormulateInput type="email" name="email" label="email" />
                <FormulateInput type="text" name="name" label="name" />
            </FormulateInput>
            <FormulateInput
                :options="{
                    first: 'First',
                    second: 'Second',
                    third: 'Third',
                    fourth: 'Fourth',
                }"
                type="select"
                placeholder="Select an option"
                label="Which of your children is your favorite?"
                multiselect
            />
            <FormulateInput
                type="textarea"
                label="Enter a tweet in the box"
                validation="required|max:50,length"
                validation-name="tweet"
                error-behavior="live"
                :help="`Keep it under 50 characters.`"
            />
        </FormulateForm>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            formValues: {
                character: '',
                password: '',
                'password-confirm': 'test',
                accept: ['first', 'third'],
                radio: 'third',
                group: [{ email: 'test123', name: 'test123' }],
            },
        };
    },
};
</script>
