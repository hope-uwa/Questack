
const logout = () => {
  localStorage.removeItem('ascii-mt-token');
  localStorage.removeItem('ascii-mt-username');
  localStorage.removeItem('ascii-mt-createdat');
  window.location.href = '/';
};
