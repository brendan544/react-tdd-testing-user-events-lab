import React, { useState } from 'react';

function App() {
  // State to store form data and submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: {
      interest1: false,
      interest2: false,
      interest3: false,
    },
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        interests: {
          ...prevData.interests,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  // Get the selected interests
  const selectedInterests = Object.entries(formData.interests)
    .filter(([_, isChecked]) => isChecked)
    .map(([interest]) => interest.replace('interest', 'Interest '))
    .join(', ');

    return (
      <div>
        <main>
          <h1>Hi, I'm (your name)</h1>
          <img alt="My profile pic" src="https://via.placeholder.com/350" />
          <h2>About Me</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <div>
            <a href="https://github.com">GitHub</a>
            <a href="https://linkedin.com">LinkedIn</a>
          </div>
          <section>
            <h2>Newsletter Signup</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <fieldset>
                <legend>Interests:</legend>
                <label>
                  <input
                    name="interest1"
                    type="checkbox"
                    checked={formData.interests.interest1}
                    onChange={handleChange}
                  />
                  Interest 1
                </label>
                <br />
                <label>
                  <input
                    name="interest2"
                    type="checkbox"
                    checked={formData.interests.interest2}
                    onChange={handleChange}
                  />
                  Interest 2
                </label>
                <br />
                <label>
                  <input
                    name="interest3"
                    type="checkbox"
                    checked={formData.interests.interest3}
                    onChange={handleChange}
                  />
                  Interest 3
                </label>
              </fieldset>
              <br />
              <button type="submit">Submit</button>
            </form>
  
            {submitted && (
              <p>
                Form submitted successfully!<br />
                Name: {formData.name}<br />
                Email: {formData.email}<br />
                {selectedInterests && `Interests: ${selectedInterests}`}
              </p>
            )}
          </section>
        </main>
      </div>
    );
  }
  
  export default App;