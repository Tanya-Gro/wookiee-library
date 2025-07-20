import { http, HttpResponse } from 'msw';
import { URLs } from '../../app/constants';
import { mockResponse } from './response';
import { mockRequest } from './request';

export const handlers = [
  http.get(URLs.people, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const page = url.searchParams.get('page');

    if (
      page &&
      +page === mockRequest.currentPage &&
      search === mockRequest.searchQuery
    ) {
      return HttpResponse.json(mockResponse);
    }

    return new HttpResponse(
      { hasError: true, message: 'Internal Server Error' },
      { status: 500 }
    );
  }),
];
