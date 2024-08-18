import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  // your test code here
  render(<App />);
  
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  // your test code here
  render(<App />);
  
  expect(screen.getByLabelText(/interest 1/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/interest 2/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/interest 3/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  // your test code here
  render(<App />);
  
  expect(screen.getByLabelText(/interest 1/i)).not.toBeChecked();
  expect(screen.getByLabelText(/interest 2/i)).not.toBeChecked();
  expect(screen.getByLabelText(/interest 3/i)).not.toBeChecked();
});

// Newsletter Form - Adding Responses


test("checked status of checkboxes changes when user clicks them", () => {
  // your test code here
  render(<App />);

  const interest1Checkbox = screen.getByLabelText(/Interest 1/i);
  const interest2Checkbox = screen.getByLabelText(/Interest 2/i);
  const interest3Checkbox = screen.getByLabelText(/Interest 3/i);

  // Click to check the checkboxes
  fireEvent.click(interest1Checkbox);
  fireEvent.click(interest2Checkbox);
  fireEvent.click(interest3Checkbox);

  // Verify that the checkboxes are checked
  expect(interest1Checkbox).toBeChecked();
  expect(interest2Checkbox).toBeChecked();
  expect(interest3Checkbox).toBeChecked();

  // Click to uncheck the checkboxes
  fireEvent.click(interest1Checkbox);
  fireEvent.click(interest2Checkbox);
  fireEvent.click(interest3Checkbox);

  // Verify that the checkboxes are unchecked
  expect(interest1Checkbox).not.toBeChecked();
  expect(interest2Checkbox).not.toBeChecked();
  expect(interest3Checkbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  // Fill out the form fields
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });

  // Check an interest
  fireEvent.click(screen.getByLabelText(/interest 1/i));

  // Submit the form
  fireEvent.click(screen.getByText(/submit/i));

  // Verify the message is displayed
  expect(screen.getByText(/form submitted successfully!/i)).toBeInTheDocument();
  expect(screen.getByText(/Interests: Interest 1/i)).toBeInTheDocument();
});