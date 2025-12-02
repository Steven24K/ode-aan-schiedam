"use client"

interface InteractiveChatWidgetProps {
    // Define any props needed for the client component here
}

export const InteractiveChatWidget = (props: InteractiveChatWidgetProps) => {
    return (
        <>
            <div className="h-screen flex bg-gray-50 text-gray-900">
                {/* Sidebar */}
                <details open className="w-72 border-r bg-white shrink-0">
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold">Chats</span>
                            <span className="text-sm text-gray-500">Topics & groups</span>
                        </div>
                        <div className="text-gray-500">
                            <i className="fas fa-angle-left" aria-hidden />
                        </div>
                    </summary>

                    <div className="px-2 py-3">
                        <div className="mb-3 px-3 text-xs text-gray-400">Pinned</div>

                        <ul className="space-y-2">
                            <li className="px-3 py-2 rounded-lg bg-gray-100 flex items-center gap-3 hover:bg-gray-200 cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm">A</div>
                                <div className="flex-1">
                                    <div className="font-medium text-sm">Architecture</div>
                                    <div className="text-xs text-gray-500">12 participants</div>
                                </div>
                                <div className="text-xs text-gray-400">• 2</div>
                            </li>

                            <li className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">T</div>
                                <div className="flex-1">
                                    <div className="font-medium text-sm">Town History</div>
                                    <div className="text-xs text-gray-500">7 participants</div>
                                </div>
                            </li>

                            <li className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm">E</div>
                                <div className="flex-1">
                                    <div className="font-medium text-sm">Events</div>
                                    <div className="text-xs text-gray-500">4 participants</div>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-4 px-3">
                            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">
                                <i className="fas fa-plus" aria-hidden /> New conversation
                            </button>
                        </div>
                    </div>
                </details>

                {/* Chat area */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-4 border-b bg-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">TG</div>
                            <div>
                                <div className="font-semibold">Town History</div>
                                <div className="text-xs text-gray-500">A place to talk about the town — 18 members</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500">
                            <button className="p-2 rounded hover:bg-gray-100"><i className="fas fa-search" /></button>
                            <button className="p-2 rounded hover:bg-gray-100"><i className="fas fa-ellipsis-h" /></button>
                        </div>
                    </div>

                    {/* Messages */}
                    <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gradient-to-b from-white to-gray-50">
                        {/* Message from other user */}
                        <div className="flex items-start gap-3 max-w-2xl">
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">JS</div>
                            <div>
                                <div className="flex items-baseline gap-3">
                                    <span className="font-semibold text-sm">Jan S.</span>
                                    <span className="text-xs text-gray-400">Mar 12, 2025 • 10:14</span>
                                </div>
                                <div className="mt-2 bg-white border rounded-lg px-4 py-2 text-sm text-gray-800 max-w-xl shadow-sm">
                                    The old town hall used to host the market. There are photos in the archive showing the square in 1905.
                                </div>
                            </div>
                        </div>

                        {/* Another message from other user */}
                        <div className="flex items-start gap-3 max-w-2xl">
                            <div className="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center text-sm font-medium">EM</div>
                            <div>
                                <div className="flex items-baseline gap-3">
                                    <span className="font-semibold text-sm">Elsa M.</span>
                                    <span className="text-xs text-gray-400">Mar 12, 2025 • 10:22</span>
                                </div>
                                <div className="mt-2 bg-white border rounded-lg px-4 py-2 text-sm text-gray-800 max-w-xl shadow-sm">
                                    I can share a scanned flyer from 1922. It's in pretty good condition.
                                </div>
                            </div>
                        </div>

                        {/* Current user message (aligned right) */}
                        <div className="flex justify-end">
                            <div className="max-w-2xl">
                                <div className="flex items-baseline justify-end gap-3">
                                    <span className="text-xs text-gray-400">You • Mar 12, 2025 • 10:27</span>
                                </div>
                                <div className="mt-2 bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm shadow-sm">
                                    That would be amazing — thank you! A scan would help a lot.
                                </div>
                            </div>
                        </div>

                        {/* System / date separator */}
                        <div className="flex items-center justify-center">
                            <div className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border">Today</div>
                        </div>

                        {/* More messages (examples) */}
                        <div className="flex items-start gap-3 max-w-2xl">
                            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-sm font-medium">MB</div>
                            <div>
                                <div className="flex items-baseline gap-3">
                                    <span className="font-semibold text-sm">Mark B.</span>
                                    <span className="text-xs text-gray-400">Mar 13, 2025 • 09:01</span>
                                </div>
                                <div className="mt-2 bg-white border rounded-lg px-4 py-2 text-sm text-gray-800 max-w-xl shadow-sm">
                                    I'll try to visit the archive this week and take some notes.
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Input area */}
                    <form className="px-6 py-4 border-t bg-white flex items-center gap-3">
                        <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                            <i className="fas fa-paperclip" aria-hidden />
                        </button>

                        <div className="flex-1">
                            <textarea
                                placeholder="Type a message..."
                                className="w-full resize-none h-12 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                                <i className="fas fa-paperclip" aria-hidden />
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                            >
                                <i className="fas fa-paper-plane" aria-hidden />
                                <span className="text-sm">Send</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}