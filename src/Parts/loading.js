function Loading({ isLoading }) {
  return (
    <div className="d-flex justify-content-center">
    <div className="spinner-grow text-primary" role="status">
    <span className="visually-hidden">Cargando...</span>
    </div>
    </div>
    );
}
export default Loading;