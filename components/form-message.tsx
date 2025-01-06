export type Message =
  | { success: string }
  | { error: string }
  | { message: string }
  | { undefined: string};

export function FormMessage({ message }: { message: Message }) {

  if(Object.values(message)[0] === "") {
    return (
      <div>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-2 w-full max-w-lg text-sm">
      {"success" in message && (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-md">
      {message.success}
    </div>
  )}
      {"error" in message && (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-center shadow-md">
      {message.error}
    </div>
  )}
      {"message" in message && (
        <div className="text-foreground border-l-2 px-4">{message.message}</div>
      )}
    </div>
  );
}
