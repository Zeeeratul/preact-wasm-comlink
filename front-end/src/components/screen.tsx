export default function Canvas() {
  return (
    <div className="w-full flex">
      <canvas
        width={160}
        height={144}
        className="pixel w-full border border-white"
      />
    </div>
  );
}
