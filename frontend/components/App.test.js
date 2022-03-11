// Write your tests here
import React from 'react';
import AppFunctional from './AppFunctional';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  render(<AppFunctional/>);
})

test('are headings visible', () => {
  const heading =  document.querySelector('#coordinates');
  expect(heading).toBeInTheDocument();
})

test('is up button appearing', () => {
  const upBtn =  document.querySelector('#up');
  expect(upBtn).toBeVisible;
})

test('is reset button visible', () => {
  const resetButton = document.querySelector('#reset');
  expect(resetButton).toBeVisible();
})

test('is message in document', () => {
  const message = document.querySelector('#message');
  expect (message).toBeInTheDocument;
})

test('is email input visible', () => {
  const email = document.querySelector('#email');
  expect(email).toBeVisible();
})


// test('sanity', () => {
//   expect(true).toBe(false)
// })
