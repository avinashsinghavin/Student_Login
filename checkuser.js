db.users.count({ username: 'zlatko' })
      .then((count) => {
        if (count > 0) {
          console.log('Username exists.');
        } else {
          console.log('Username does not exist.');
        }
      });