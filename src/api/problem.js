import http from '@/utils/http.ts';

export function getProblems(page, pageSize) {
  return http.get('/problem', {
    params: {
      page,
      pageSize,
    },
  });
}

// export function getDiscussion(id) {
//   return http({
//     url: `/problems/${id}/discussions`,
//     method: "get"
//   });
// }
// export function createReply(id, parent, comment) {
//   console.log(parent);
//   console.log(comment);
//   return http({
//     url: `/problems/${id}/discussions`,
//     method: "post",
//     data: {
//       parent: parent,
//       content: comment
//     }
//   });
// }

export function createProblem(
  title,
  description,
  descriptionHtml,
  type,
  special,
  time,
  memory
) {
  return http({
    url: '/problems',
    method: 'post',
    data: {
      title: title,
      descriptionHtml: descriptionHtml,
      description: description,
      type: type,
      special: special,
      timeLimit: parseInt(time),
      memoryLimit: parseInt(memory),
    },
  });
}

export function getProblem(id) {
  return http({
    url: `/problems/${id}`,
    method: 'get',
  });
}

export function deleteProblem(id) {
  return http({
    url: `/problems/${id}`,
    method: 'delete',
  });
}

export function getProblemRanklist(id) {
  return http({
    url: `/problems/${id}/ranklist`,
    method: 'get',
  });
}

export function updateProblem(
  id,
  title,
  description,
  descriptionHtml,
  type,
  special,
  time,
  memory
) {
  return http({
    url: `/problems/${id}`,
    method: 'patch',
    data: {
      id: id,
      title: title,
      descriptionHtml: descriptionHtml,
      description: description,
      type: type,
      special: special,
      timeLimit: parseInt(time),
      memoryLimit: parseInt(memory),
    },
  });
}

export function rejudgeProblem(id) {
  return http({
    url: `/problem/${id}/rejudge`,
    method: 'post',
  });
}

export function getFiles(id) {
  return http({
    url: `/problems/${id}/files`,
    method: 'get',
  });
}

export function deleteFile(id, name) {
  return http({
    url: `/problems/${id}/files/${name}`,
    method: 'delete',
  });
}

export function uploadFile(id, name, binary) {
  return http({
    url: `/problems/${id}/files/${name}`,
    method: 'post',
    data: binary,
  });
}
