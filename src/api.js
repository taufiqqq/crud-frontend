const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const ensureBaseUrl = () => {
  if (!API_BASE_URL) {
    throw new Error('REACT_APP_BACKEND_URL is not configured');
  }
};

export async function createBook(name) {
  ensureBaseUrl();
  const response = await fetch(`${API_BASE_URL}/create/${encodeURIComponent(name)}`, {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error('Failed to create book');
  }

  return response;
}

export async function getBooks() {
  ensureBaseUrl();
  const response = await fetch(`${API_BASE_URL}/books`);

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  return response.json();
}

export async function deleteBook(id) {
  ensureBaseUrl();
  const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }

  return response;
}

export async function updateBook(id, newName) {
  ensureBaseUrl();
  const response = await fetch(
    `${API_BASE_URL}/update/${id}?newName=${encodeURIComponent(newName)}`,
    { method: 'PUT' }
  );

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  return response;
}
