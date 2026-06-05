fetch('http://localhost:3001/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query {
        user(id: "admin-123") {
          id
          name
        }
      }
    `
  })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
