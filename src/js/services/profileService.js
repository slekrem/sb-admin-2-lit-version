export const updateProfileDetailsAsync = (formData) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            succeeded: true,
            payload: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName')
            }
        });
    }, 2000);
});