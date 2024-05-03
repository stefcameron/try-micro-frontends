// add custom DOM expectations that work well with the Testing Library
//  (just importing is enough)
import '@testing-library/jest-dom';

// add custom `toHaveNoViolations` matcher (just importing is enough)
import 'jest-axe/extend-expect';

// enable `fetch()` mocking but deactivate it by default (individual suites/tests
//  must opt-in instead of it being mocked by default for all)
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();
fetchMock.dontMock();
