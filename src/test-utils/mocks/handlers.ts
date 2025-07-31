import { http, HttpResponse } from 'msw';
import { LINKS } from '../../app/constants';
import { mockResponse, mockServerError } from './response';
import { mockRequest } from './request';
import { mockDetails } from './details';

export const handlers = [
  http.get(LINKS.characters, ({ request }) => {
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

    return new HttpResponse(mockServerError, { status: 500 });
  }),

  http.get(`${LINKS.details}:id.json`, ({ request }) => {
    const url = new URL(request.url);
    const lastElem = url.pathname.split('/').at(-1);
    const id = lastElem?.substring(0, lastElem.indexOf('.'));

    if (id) {
      if (id === mockResponse.results[0].id) {
        return HttpResponse.json(mockDetails[0]);
      }
    }
    return new HttpResponse(null, { status: 404 });
  }),
];
