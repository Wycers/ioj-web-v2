import request from '@/utils/http.ts';

export function createSubmission(problem, code, language) {
  return request({
    url: '/submissions',
    method: 'post',
    data: {
      problem,
      code,
      language,
    },
  });
}

export function getSubmissions() {
  return request({
    url: '/submissions?order=desc',
    method: 'get',
  });
}

export function getSubmissionSourceCode(id) {
  return request({
    url: `/submissions/${id}/code`,
    method: 'get',
  });
}

export function getSubmission(id) {
  return request({
    url: `/submissions/${id}`,
    method: 'get',
  });
}

export function submissionsRejudge(id) {
  return request({
    url: `/submissions/${id}/rejudge`,
    method: 'post',
  });
}

export function rejudge(id) {
  console.log('XD');
}
